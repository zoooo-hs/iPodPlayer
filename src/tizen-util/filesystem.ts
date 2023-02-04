import { AttributeFilter, CompositeFilter, content, Content } from "tizen-common-web";

const fetchMusic = () => {

	var ipodMusicFilter = new AttributeFilter("contentURI", "CONTAINS", "iPod_Control/Music/");
	var filter = new CompositeFilter("INTERSECTION", [ ipodMusicFilter ]);

    console.log("before find");

    content.find((contents: Content[]) => { 
        console.log("success");
        contents.forEach(content => console.log(content.title));
    },
        (error) => { console.log(error)},
        null, filter
    );
};


export default fetchMusic;