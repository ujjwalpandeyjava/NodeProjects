/*Connect google fhir

>>> google libraries for: 
	google-auth-library-oauth2.0
	google-auth-library-credentials
	google-http-client

>>> EMR Constants
	public static String EMR_URL = "";
	public static String EMR_CLIENT_ID = "";
	public static String EMR_SECRET_KEY = "";
	public static String EMR_OAUTH_URL = "";
	public static int EMR_TYPE = 1; // Default for SafetyLABS emr	
	
>>> Code*/

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.TimerTask;

class GoogleAccessToken {

  public String getAccessToken(int expireTime, String scope, String pid) {
    try {
      if (EMRMgr.GOOGLE_ACCESS_TOKEN == null) {
        String filePath = "";
        InputStream inputStream = new FileInputStream(filePath);
        GoogleCredentials credential = GoogleCredentials
          .fromStream(inputStream)
          .createScoped("https://www.googleapis.com/auth/cloud-platform");
        if (credential != null) {
          credential.refresh();
          AccessToken token = credential.getAccessToken();
          if (token != null) {
            if (token.getTokenValue() != null) {
              EMRMgr.GOOGLE_ACCESS_TOKEN = token.getTokenValue();
              Timer t = new Timer();
              t.schedule(
                new TimerTask() {
                  @Override
                  public void run() {
                    EMRMgr.GOOGLE_ACCESS_TOKEN = null;
                    t.cancel();
                    t.purge();
                  }
                },
                token.getExpirationTime()
              );
              /*-------------------------------------------------*/
              return EMRMgr.GOOGLE_ACCESS_TOKEN;
            } else System.out.println("token.getTokenValue null");
          } else System.out.println(
            "Access token cannot be created for Google FHIR, Token not created."
          );
        } else System.out.println(
          "Access token cannot be created for Google FHIR, Error during create token."
        );
        inputStream.close();
        inputStream = null;
      } else {
        return EMRMgr.GOOGLE_ACCESS_TOKEN;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}
