interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
