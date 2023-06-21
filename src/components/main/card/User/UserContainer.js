export default function UserContainer({ children, style, index }) {
  return (                
      <div key={index} className={`flex justify-between items-center w-[400px] gap-4 bg-slate-900 rounded-lg ${style} `}>
        {children}
      </div>
    );
  }