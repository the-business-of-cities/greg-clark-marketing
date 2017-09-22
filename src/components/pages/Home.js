import { 
	Container, 
	FullWidthImg, 
} from "src/components/common";

import Data from "src/data";

// --------------------------------------------------

const Home = () => (
	<FullWidthImg 
		src = { Data.homeImage.url }
	/>
);

export default Home;