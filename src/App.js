import { ThemeProvider, } from "styled-components";
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom";

import routesConfig from "./routesConfig";
import injectGlobalStyles from "./components/style/globalStyles";

import Nav from "./components/common/Nav";
import Main from "./components/common/Main";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

import * as vars from "./components/style/vars";

// --------------------------------------------------

injectGlobalStyles();

const defaultColors = {
	...vars.colors,
};

const routes = routesConfig.map(({
	component: Comp,
	path,
	exact,
	...rest
}, i) => {
	const render = props => (
		<Comp
			{ ...props }
			{ ...rest }
		/>
	);

	return <Route
		key = { path + i }
		path = { path }
		exact = { exact }
		render = { render }
	/>
});

export default () =>
	<Router>
		<ScrollToTop>
			<ThemeProvider theme = { defaultColors }>
				<div>
					<Nav key = "Nav" />
					<Main key = "Main">
						<Switch>
							{ routes }
						</Switch>
					</Main>					
					<Footer key = "Footer" />
				</div>
			</ThemeProvider>
		</ScrollToTop>
	</Router>;
