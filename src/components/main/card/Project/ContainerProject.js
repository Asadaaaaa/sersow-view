import OwnerProject from "@/components/main/card/Project/OwnerProject";
import TitleProject from "@/components/main/card/Project/TitleProject";
import CategoryProject from "@/components/main/card/Project/CategoryProject";
import ThumbnailProject from "@/components/main/card/Project/ThumbnailProject";
import InteractionProjcet from "@/components/main/card/Project/InteractionProject";
import DescriptionProject from "@/components/main/card/Project/DescriptionProject";

export default function ContainerProject({index, data}){
    return(
        <div className="p-6 bg-slate-900 rounded-lg w-96" key={index}>
             <OwnerProject id={data.id} 
                            owner_username={data.owner_username}
                            owner_image={data.owner_image}
                            owner_name={data.owner_name}
                            title={data.title}
                            isMyProject={data.isMyProject} />
            
            <TitleProject id={data.id}
                            logo={data.logo}
                            title={data.title}/>

            <CategoryProject categories={data["categories"]} />                  
            <DescriptionProject description={data.description} />
            <ThumbnailProject thumbnail={data.thumbnail} />
            <InteractionProjcet id={data.id}
                                isLiked={data.isLiked}/>
        </div>
    )
}