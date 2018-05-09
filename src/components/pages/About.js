import styled from "styled-components";

import {
	PageWrapper,
	PageBody,
	PageImage,
	Container,
	TextCell,
} from "src/components/common";

import Generic from "./Generic";
import LogoGrid from "src/components/common/LogoGrid";

import * as mixins from "src/components/style/mixins";

import data from "src/data";

// --------------------------------------------------

const logos = R.pipe(arr => R.repeat(arr, 10), R.unnest)(data.logos);

export default props => (
	<Generic { ...props }>
		<LogoGrid logos = { logos } />
	</Generic>
);
