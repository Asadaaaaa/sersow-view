export default function UserContainer({ children, index, style }) {
  //flex justify-between items-center w-[400px] gap-4 pr-2 bg-slate-900 rounded-lg  
  return (                
      <div className={`flex justify-between items-center w-[400px] gap-4 bg-slate-900 rounded-lg ${style} `}key={index}>
        {children}
      </div>
    );
  }