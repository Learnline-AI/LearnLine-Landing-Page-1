interface SocialProofProps {
  count: string
  label: string
}

export function SocialProof({ count, label }: SocialProofProps) {
  return (
    <div className="bg-white border-2 border-black flex items-center gap-4 px-[18px] py-[10px]">
      {/* Avatar Stack */}
      <div className="flex items-center pr-2">
        <div className="w-8 h-8 rounded-full bg-gray-light border-2 border-black" />
        <div className="w-8 h-8 rounded-full bg-gray-mid border-2 border-black -ml-2" />
        <div className="w-8 h-8 rounded-full bg-gray-dark border-2 border-black -ml-2" />
      </div>

      {/* Text */}
      <span className="font-plus-jakarta font-extrabold text-xs uppercase tracking-[1.2px] text-black">
        {count} {label}
      </span>
    </div>
  )
}
