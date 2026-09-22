require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = require('../config/db');
const User = require('../models/User');
const Property = require('../models/Property');
const Room = require('../models/Room');
const Destination = require('../models/Destination');
const Activity = require('../models/Activity');

const usersData = require('./data/users');
const propertiesData = require('./data/properties');
const roomsData = require('./data/rooms');
const destinationsData = require('./data/destinations');
const activitiesData = require('./data/activities');


const DESTINATION_ACTIVITY_MAP = {
  'Kuttanad Backwaters': ['Houseboat Cruise', 'Village Walk', 'Paddy Field Visit', 'Canoeing'],
  'Alappuzha Beach': ['Photography Tour', 'Local Food Experience'],
  'Pathiramanal Island': ['Bird Watching', 'Photography Tour'],
  Kumarakom: ['Bird Watching', 'Houseboat Cruise'],
  'Marari Beach': ['Local Food Experience', 'Cycling'],
  'Vembanad Lake': ['Houseboat Cruise', 'Sunset Cruise', 'Fishing', 'Kayaking'],
  Ambalappuzha: ['Traditional Cooking Experience'],
  Champakulam: ['Village Walk', 'Canoeing'],
  Punnamada: ['Sunset Cruise', 'Houseboat Cruise'],
  'R Block Kuttanad': ['Paddy Field Visit', 'Cycling', 'Traditional Cooking Experience'],
};

const seed = async () => {
  await connectDB();

  try {
    console.log('Clearing existing demo content...');
    await Promise.all([
      Property.deleteMany({}),
      Room.deleteMany({}),
      Destination.deleteMany({}),
      Activity.deleteMany({}),
    ]);
    
    await User.deleteMany({ email: { $in: usersData.map((u) => u.email) } });

    console.log('Seeding admin user(s)...');
    
    const createdUsers = await User.create(usersData);

    console.log('Seeding activities...');
    const createdActivities = await Activity.create(activitiesData);
    const activityByName = new Map(createdActivities.map((a) => [a.name, a]));

    console.log('Seeding destinations...');
    const destinationsWithActivities = destinationsData.map((dest) => {
      const linkedNames = DESTINATION_ACTIVITY_MAP[dest.name] || [];
      const activityIds = linkedNames
        .map((name) => activityByName.get(name)?._id)
        .filter(Boolean);
      return { ...dest, activities: activityIds };
    });
    const createdDestinations = await Destination.create(destinationsWithActivities);

    console.log('Seeding properties...');
    const createdProperties = await Property.create(propertiesData);
    const propertyByTitle = new Map(createdProperties.map((p) => [p.title, p]));

    console.log('Seeding rooms...');
    const roomsWithPropertyIds = roomsData.map(({ propertyTitle, ...room }) => {
      const property = propertyByTitle.get(propertyTitle);
      if (!property) {
        throw new Error(
          `Seed error: no property found with title "${propertyTitle}" for room "${room.name}"`
        );
      }
      return { ...room, property: property._id };
    });
    const createdRooms = await Room.create(roomsWithPropertyIds);

    console.log('\n Seed complete:');
    console.log(`   Users:        ${createdUsers.length}`);
    console.log(`   Activities:   ${createdActivities.length}`);
    console.log(`   Destinations: ${createdDestinations.length}`);
    console.log(`   Properties:   ${createdProperties.length}`);
    console.log(`   Rooms:        ${createdRooms.length}`);
    console.log('\n Demo admin login (local development only):');
    usersData.forEach((u) => {
      console.log(`   email: ${u.email}  |  password: ${u.password}`);
    });
    console.log('\n   Change this password before deploying anywhere beyond your own machine.\n');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
