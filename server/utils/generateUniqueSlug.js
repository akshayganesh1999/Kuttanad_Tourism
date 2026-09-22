const slugify = require('slugify');

const generateUniqueSlug = async (doc, Model, sourceField = 'title') => {
  if (!doc[sourceField]) return;
  if (doc.slug && !doc.isModified(sourceField)) return;

  const baseSlug = slugify(doc[sourceField], { lower: true, strict: true, trim: true });
  let candidate = baseSlug;
  let suffix = 1;

  while (await Model.exists({ slug: candidate, _id: { $ne: doc._id } })) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  doc.slug = candidate;
};

module.exports = generateUniqueSlug;
