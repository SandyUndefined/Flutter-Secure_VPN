package com.example.secureVpn

import android.content.Intent
import com.topfreelancerdeveloper.flutter_openvpn.FlutterOpenvpnPlugin;
import io.flutter.embedding.android.FlutterActivity

class MainActivity: FlutterActivity() {
   
   //public static final int REQUEST_CODE = 1;

    @Override

    protected override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 1) {
            if (resultCode == RESULT_OK) {
                FlutterOpenvpnPlugin.setPermission(true);
            } else {
                FlutterOpenvpnPlugin.setPermission(false);
            }
    }

}


    }



