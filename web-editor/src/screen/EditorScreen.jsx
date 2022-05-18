import * as React from 'react';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Settings } from '../component/Settings';
import { mapboxMapStyleJsonCache, RightPanel } from '../component/RightPanel';
import { PreviewSnackBar } from '../component/PreviewSnackBar';

export const EditorScreen = ({ mapProvider }) => {

  // mapbox states
  const [mapStyle, setMapStyle] = useState(null);
	const [apiKey, setAPIKey] = useState("pk.eyJ1Ijoia2V2bW8zMTQiLCJhIjoiY2oyMDFlMGpsMDN3bTJ4bjR1MzRrbDFleCJ9.7XEB3HHBGr-N6ataUZh_6g");
	const [styleID, setStyleID] = useState("mapbox/streets-v11");
	const [pullKey, setPullKey] = useState("");
	const [zoom, setZoom] = useState(5);
	const [lang, setLang] = useState("EN");


  // google map states
  const [googleStyleJSON, setGoogleStyleJSON] = useState(null);
  const [googleApiKey, setGoogleApiKey] = useState("tempInitKey");

  const [openPreviewSnackBar, setOpenPreviewSnackBar] = useState(false);

  useEffect(() => {
      fetch("https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=pk.eyJ1Ijoia2V2bW8zMTQiLCJhIjoiY2oyMDFlMGpsMDN3bTJ4bjR1MzRrbDFleCJ9.7XEB3HHBGr-N6ataUZh_6g")
        .then(res => res.json())
        .then(res => {
          mapboxMapStyleJsonCache["mapbox/streets-v11"] = res;
          setMapStyle(res);
        });
    
  }, [])

	const onStyleIDSubmit = (styleID, apiKey) => {
    if (styleID === undefined || styleID === null || styleID === "") {
      setOpenPreviewSnackBar(true);
			return
		}
		if (!styleID.includes("/")) {
      setOpenPreviewSnackBar(true);
			return
		}
    if (apiKey === undefined || apiKey === null || apiKey === "") {
      setOpenPreviewSnackBar(true);
      return
    }
    if (!apiKey.includes("pk.")) {
      setOpenPreviewSnackBar(true);
      return
    }
		setStyleID(styleID);
    setAPIKey(apiKey);
	}


  const onStyleJSONSubmit = (styleJSON, apiKey) => {
    styleJSON = styleJSON.trim();
    if (styleJSON === "") {
      styleJSON = "[]";
    }

    if (styleJSON === undefined || styleJSON === null) {
      setOpenPreviewSnackBar(true);
      return
    }
    
    if (apiKey === undefined || apiKey === null || apiKey === "") {
      setOpenPreviewSnackBar(true);
      return
    }

    apiKey = apiKey.trim()
    setGoogleStyleJSON(styleJSON);
    setGoogleApiKey(apiKey);
  }


	return (
    <Stack direction="row">
      {
        mapStyle ?
        <>
          <Settings 
          	mapProvider={mapProvider}
            onStyleIDSubmit={onStyleIDSubmit}
            onStyleJSONSubmit={onStyleJSONSubmit}
            mapStyle={mapStyle}
            setMapStyle={setMapStyle}
            apiKey={apiKey} 
            setAPIKey={setAPIKey}
            styleID={styleID}
            setStyleID={setStyleID}
            pullKey={pullKey}
            setPullKey={setPullKey}
            zoom={zoom}
            setZoom={setZoom}
            lang={lang}
            setLang={setLang}
          >
        </Settings>
        <RightPanel
          mapProvider={mapProvider}
          setMapStyle={setMapStyle}
          mapStyle={mapStyle}
          zoom={zoom}
          lang={lang}
          pullKey={pullKey}
          apiKey={mapProvider === "mapbox" ? apiKey : googleApiKey}
          styleID={styleID}

          googleStyleJSON={googleStyleJSON}
          >
        </RightPanel>
      </> :
      <div>Loading...</div>
      }
      <PreviewSnackBar 
				open={openPreviewSnackBar}
				setOpen={setOpenPreviewSnackBar}
			/>
    </Stack>
	)
}