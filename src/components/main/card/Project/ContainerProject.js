import OwnerProject from "@/components/main/card/Project/OwnerProject";
import TitleProject from "@/components/main/card/Project/TitleProject";
import CategoryProject from "@/components/main/card/Project/CategoryProject";
import ThumbnailProject from "@/components/main/card/Project/ThumbnailProject";
import InteractionProjcet from "@/components/main/card/Project/InteractionProject";
import DescriptionProject from "@/components/main/card/Project/DescriptionProject";

export default function ContainerProject({index, data, refs=null}){
    return(
        <div className="p-6 bg-slate-900 rounded-lg w-96" key={index} ref={refs}>
            <OwnerProject
							id={data.id} 
							owner={data.owner} 
							title={data.title}
							isMyProject={data.isMyProject} 
							contributors={data.contributors}
						/>

            <TitleProject 
							id={data.id}
							logo={data.logo}
							title={data.title}
						/>

            <CategoryProject categories={data["categories"]} />                  
            <DescriptionProject description={data.description} />
            <ThumbnailProject thumbnail={data.thumbnail} />
            <InteractionProjcet 
							id={data.id}
							isLiked={data.isLiked}
						/>
        </div>
    )
}