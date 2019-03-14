package com.faithmeetsloves;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; 
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.reactnative.camera.RNCameraPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.horcrux.svg.SvgPackage;

import java.util.Arrays;
import java.util.List;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import com.facebook.appevents.AppEventsLogger;

public class MainApplication extends Application implements ReactApplication {

   private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseStoragePackage(),
            new SvgPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage(), 
            new ReactVideoPackage(),
            new PickerPackage(),
            new LocationServicesDialogBoxPackage(),
            new RNDeviceInfo(),
            new RNFetchBlobPackage(),
            new RNCameraPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNGoogleSigninPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNI18nPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
   // AppEventsLogger.activateApp(this);
  }
}
