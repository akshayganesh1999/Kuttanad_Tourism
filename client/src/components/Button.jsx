const VARIANTS = {
  primary:
    'bg-backwater-700 text-white hover:bg-backwater-900 dark:bg-gold-500 dark:text-charcoal-900 dark:hover:bg-gold-400',
  secondary:
    'bg-white text-backwater-900 border border-backwater-200 hover:bg-backwater-50 dark:bg-white/5 dark:text-sand-50 dark:border-white/15 dark:hover:bg-white/10',
  ghost:
    'bg-transparent text-backwater-900 hover:bg-backwater-50 dark:text-sand-50 dark:hover:bg-white/10',
};

const Button = ({ as: Component = 'button', variant = 'primary', className = '', children, ...props }) => (
  <Component
    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${VARIANTS[variant]} ${className}`}
    {...props}
  >
    {children}
  </Component>
);

export default Button;