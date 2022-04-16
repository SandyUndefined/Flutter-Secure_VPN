import 'package:firebase_admob/firebase_admob.dart';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:securevpn/constants/stringConst.dart';
import 'package:securevpn/modal/vpn.dart';
import 'package:securevpn/screen/home/home.dart';

import 'constants/colorsConst.dart';
import 'screen/privacyPolicy/privacyPolicy.dart';
import 'screen/privacyPolicy/termsAndCondition.dart';
import 'screen/splashScreen/splashScreen.dart';
import 'screen/welcomeScree/welcomeScree.dart';

void main() {
  runApp(MyApp());
  FirebaseAdMob.instance.initialize(
    appId: Platform.isAndroid
        ? StringConst.ADMOB_APP_ID_Android
        : Platform.isIOS
            ? StringConst.ADMOB_APP_ID_IOS
            : "",
  );
}

class MyApp extends StatelessWidget {
  // List<Vpn> vpn = [];
  // This widget is the root of your application.

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => Vpns(),
        )
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Secure Vpn',
        theme: ThemeData(
            primarySwatch: Colors.blue,
            visualDensity: VisualDensity.adaptivePlatformDensity,
            appBarTheme: AppBarTheme(
              color: ColorConst.backgroundColor,
            ),
            textTheme: TextTheme(
                caption: TextStyle(
              color: Colors.white,
            ))),
        routes: {
          Home.routeName: (_) => Home(),
          WelcomeScreen.routeName: (_) => WelcomeScreen(),
          PrivacyPolicy.routeName: (_) => PrivacyPolicy(),
          LicenseAggrement.routeName: (_) => LicenseAggrement(),
        },
        home: SplashScreen(),
      ),
    );
  }
}
