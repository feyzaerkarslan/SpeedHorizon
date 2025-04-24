interface StockBadgeProps {
  stock: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StockBadge({ stock, size = 'md' }: StockBadgeProps) {
  const getStockStatus = () => {
    if (stock === 0) return { text: 'Tükendi', color: 'red' };
    if (stock <= 3) return { text: 'Son Birkaç Ürün', color: 'yellow' };
    return { text: 'Stokta', color: 'green' };
  };

  const status = getStockStatus();
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4',
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          ${sizeClasses[size]}
          font-semibold rounded-full
          ${status.color === 'green' ? 'bg-green-100 text-green-800' : ''}
          ${status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : ''}
          ${status.color === 'red' ? 'bg-red-100 text-red-800' : ''}
        `}
      >
        {status.text}
      </span>
      <span className={`text-gray-600 ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
        ({stock} adet)
      </span>
    </div>
  );
}
