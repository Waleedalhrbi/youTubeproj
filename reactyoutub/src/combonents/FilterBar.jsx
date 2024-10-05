function FilterBar() {
    return (
      <div className="bg-white shadow-md p-2 mb-4 hidden lg:block">
        <div className="container mx-auto flex space-x-4">
          {['All videos', 'Music', 'Gaming', 'Live', 'Nature', 'Podcasts', 'Tourism', 'Cooking'].map((filter) => (
            <button key={filter} className="btn btn-sm rounded-full bg-gray-100 text-gray-700">
              {filter}
            </button>
          ))}
        </div>
      </div>
    );
  }

export default FilterBar;
