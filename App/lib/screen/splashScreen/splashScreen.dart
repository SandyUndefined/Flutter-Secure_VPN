import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:securevpn/modal/vpn.dart';
import 'package:securevpn/screen/home/home.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/colorsConst.dart';
import '../../constants/imagesConst.dart';
import '../../constants/stringConst.dart';
import '../../constants/textStyleConst.dart';
import '../welcomeScree/welcomeScree.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  AnimationController animationController;
  Animation<double> animation;

  startTime() async {
    // Future.delayed(Duration(seconds: 3), () async {
    SharedPreferences _pref = await SharedPreferences.getInstance();
    await Provider.of<Vpns>(context, listen: false).fetchVpns();
    if (_pref.containsKey('firstTime')) {
      Navigator.pushReplacementNamed(context, Home.routeName);
    } else {
      Navigator.pushReplacementNamed(context, WelcomeScreen.routeName);
    }
    // });
  }

  @override
  void initState() {
    animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    animation =
        CurvedAnimation(parent: animationController, curve: Curves.bounceOut);
    animation.addListener(() => this.setState(() {}));
    animationController.forward();
    animationController.repeat(
      reverse: true,
      period: Duration(seconds: 3),
    );
    startTime();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            height: double.infinity,
            width: double.infinity,
            decoration: BoxDecoration(
              color: ColorConst.backgroundColor,
            ),
          ),
          Column(
            children: [
              Expanded(
                child: Column(
                  children: [
                    Expanded(
                      child: Center(
                        child: Stack(children: [
                          Positioned(
                            right: MediaQuery.of(context).size.width / 2 - 25,
                            top: MediaQuery.of(context).size.height /
                                3 *
                                (animation.value + 0.2),
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(100),
                                // gradient: ColorConst.PRIMARYGRADIENT,
                              ),
                              height: 30 * (1 + animation.value),
                              width: 30 * (1 + animation.value),
                              child: Center(
                                child: Image.asset(ImageConst.APPLOGO),
                              ),
                            ),
                          ),
                        ]),
                      ),
                    ),
                    Expanded(
                        child: Column(
                      children: [
                        Container(
                          child: Text(
                            StringConst.APPNAME,
                            style: TextStyleConst.header1
                                .copyWith(fontSize: 20, color: Colors.white),
                          ),
                        ),
                        Text(
                          StringConst.APPDESCRIPTION,
                          style: TextStyleConst.body1.copyWith(
                            color: Colors.white,
                          ),
                        )
                      ],
                    ))
                  ],
                ),
              ),
              Text(
                StringConst.COPYRIGHTTEXT,
                style: Theme.of(context).textTheme.caption,
              ),
              SizedBox(
                height: 30,
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    animationController.dispose();
    super.dispose();
  }
}

class PRIMARYGRADIENT {}

class ColorConstants {}
