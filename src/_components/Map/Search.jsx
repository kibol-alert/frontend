import React from 'react';
import ReactLeafletSearch from "react-leaflet-search";

const SearchComponent = props => (
	<ReactLeafletSearch
		position="topleft"
		inputPlaceholder="Wpisz nazwę miasta"
		search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
		zoom={12} // Default value is 10
		showMarker={false}
		showPopup={false}
		openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
		closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
		providerOptions={{ searchBounds: [] }} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
		customProvider={undefined | { search: (searchString) => { } }} // see examples to usage details until docs are ready
	/>
)

export default SearchComponent;