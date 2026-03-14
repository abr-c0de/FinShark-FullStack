interface TileProps {
  title: string;
  info: string;
}

const Tile = ({ title, info }: TileProps) => {
  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
        <div className="p-5">
          <h5 className="text-gray-400 uppercase font-semibold text-xs mb-2">
            {title}
          </h5>

          <span className="text-gray-900 font-bold text-xl wrap-break-words">
            {info}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
