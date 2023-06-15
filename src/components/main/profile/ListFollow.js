import font from '@/app/font.module.css';


export default function ListFollow({closeHandler}){
    return(
        <div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/50 border-solid border-slate-700 border-r-[1px]">
          <div className="flex flex-col p-4 gap-2 bg-slate-900  rounded-xl border-slate-700 border-[1px]">
            <div className="flex justify-between border-b-slate-700 border-b-2">
                <div className={`${font.Satoshi_b2bold} text-white cursor-pointer`}>@username</div>
                <div className="cursor-pointer" onClick={closeHandler}>
                  {/* <FaTimes className="w-4 h-4 text-white" /> */}
                  close
                </div>
            </div>
            <div className="flex justify-center gap-2 p-0"> 
              <div className="flex items-center py-3 px-6 rounded-3xl">
                Followers
              </div>
              <div className="flex items-center py-3 px-6 rounded-3xl  text-slate-400">
                Followings
              </div>
              <div className='flex flex-wrap justify-center gap-6 p-0'>
              {/* <CardContainer key={index}>
      <Link
        href={`/profile/${item.username}`}
        className="flex items-center gap-2"
      >
        <Image
          alt="Avatar User"
          className="w-12 h-12 object-cover rounded-full "
          src={
            process.env.NEXT_PUBLIC_HOST +
            "/" +
            process.env.NEXT_PUBLIC_VERSION +
            item.image
          }
          width={220}
          height={220}
        />
        <div className="flex flex-col justify-center w-32 h-10">
          <CardLabelName name={item.name} />
          <CardLabelUsername username={"@" + item.username} />
        </div>
      </Link>
      {item.isMyProfile ? (
        <div
          className={`${font.Satoshi_c2bold} text-center w-[104px] text-slate-200 py-2 pl-[52px]`}
        >
          ME
        </div>
      ) : item.isFollowed ? (
        <button
          className={`${font.Satoshi_c2bold} w-20 h-8 py-2 text-slate-200 border-solid border-slate-700 border-[1px] rounded-3xl`}
          onClick={() => {
            unfollow(item.id);
          }}
        >
          Following
        </button>
      ) : (
        <button
          className={`${font.Satoshi_c2bold} w-16 h-8 py-2 text-slate-700 bg-slate-200 border-solid border-white border-[1px] rounded-3xl`}
          onClick={() => {
            follow(item.id);
          }}
        >
          Follow
        </button>
      )}
    </CardContainer> */}
              </div>
            </div>
          </div>
        </div>
    )
}