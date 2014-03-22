package fr.itlabs.cordova.geolocation;

import java.util.Locale;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;
import android.util.Log;



public class LastPosition extends CordovaPlugin {

    private static final String TAG = "LastPosition";

	@Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("getOSLanguage")){
        	this.getOSLanguage(callbackContext);
        	return true;
        }
        else if (action.equals("get")) {
            this.get(callbackContext);
            return true;
        }
        return false;
    }


	private void getOSLanguage(CallbackContext callbackContext){
		try{
    		JSONObject data = new JSONObject();
    		data.put("language", Locale.getDefault().getLanguage());
            callbackContext.success(data);
            return;
		}
		catch(JSONException e){
			callbackContext.error("LANGUAGE EXCEPTION");
		}
	}

    private void get(CallbackContext callbackContext) {
        try{
        	LocationManager locationManager = (LocationManager) this.cordova.getActivity().getSystemService(Context.LOCATION_SERVICE);

        	// Detection de la position en live, processus pouvant prendre a utiliser si le LastKnowLocation
        	//LocationListener mlocListener = new AldoLocationListener(callbackContext, locationManager);
        	//locationManager.requestLocationUpdates( LocationManager.NETWORK_PROVIDER, 0, 0, mlocListener);


        	// On recupere la derniere position reseau
        	Location loc = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        	if(loc != null){
        		JSONObject position = new JSONObject();
        		position.put("provider", "GPS");

        		JSONObject coords = new JSONObject();
            	coords.put("latitude", loc.getLatitude());
            	coords.put("longitude", loc.getLongitude());
            	position.put("coords", coords);

                Log.i(TAG, "Found last position from the GPS provider: " + loc.getLatitude() + ", " + loc.getLongitude());

                callbackContext.success(position);
                return;
        	}
        	// Si il n'y en a pas, on recupere la derniere position GPS
        	loc = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
        	if(loc != null){
        		JSONObject position = new JSONObject();
            	position.put("provider", "NETWORK");

        		JSONObject coords = new JSONObject();
            	coords.put("latitude", loc.getLatitude());
            	coords.put("longitude", loc.getLongitude());
            	position.put("coords", coords);

                Log.i(TAG, "Found last position from the NETWORK provider: " + loc.getLatitude() + ", " + loc.getLongitude());

                callbackContext.success(position);
        		return;
        	}

            Log.i(TAG, "Last position unavailable");
        	callbackContext.error("CACHED_POSITION_UNAVAILABLE");

        } catch (JSONException e){
            Log.e(TAG, "Error while searching last position", e);
        	callbackContext.error("GEOLOC EXCEPTION");
        }
    }

}
