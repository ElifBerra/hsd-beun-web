interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
}

const TeamCard = ({ name, role, image, linkedin }: TeamMemberProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-all group">
      <div className="w-24 h-24 bg-gradient-to-tr from-red-600 to-orange-500 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center text-3xl">
        {/* İleride gerçek resim gelince <img src={image} /> olacak */}
        👤
      </div>
      <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{name}</h3>
      <p className="text-gray-400 text-sm mb-4">{role}</p>
      {linkedin && (
        <a href={linkedin} target="_blank" className="text-xs text-blue-400 hover:underline">LinkedIn Profile</a>
      )}
    </div>
  );
};

export default TeamCard;