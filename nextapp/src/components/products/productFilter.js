export default function ProductFilter({ filters, setFilters, onApply }) {
    return (
        <div className="mb-6 flex flex-wrap gap-4">
            <label>
                <input
                    type="checkbox"
                    checked={filters.on_sale}
                    onChange={e => setFilters(prev => ({ ...prev, on_sale: e.target.checked }))}
                />
                <span className="ml-2">On Sale</span>
            </label>
            <select
                value={filters.price_order}
                onChange={e => setFilters(prev => ({ ...prev, price_order: e.target.value, orderby: 'price' }))}
            >
                <option value="">-- Price Order --</option>
                <option value="asc">Price Low to High</option>
                <option value="desc">Price High to Low</option>
            </select>
            <button
                className="px-3 py-1 bg-gray-700 text-white rounded"
                onClick={onApply}
            >
                Apply Filters
            </button>
        </div>
    );
}