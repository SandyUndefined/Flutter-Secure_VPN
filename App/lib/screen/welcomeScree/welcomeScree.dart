import 'package:flutter/material.dart';
import 'package:flutter_carousel_slider/carousel_slider.dart';
import 'package:flutter_carousel_slider/carousel_slider_indicators.dart';
import 'package:securevpn/constants/stringConst.dart';
import 'package:securevpn/screen/home/home.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/colorsConst.dart';
import '../../constants/textStyleConst.dart';
import '../privacyPolicy/privacyPolicy.dart';
import '../privacyPolicy/termsAndCondition.dart';
import 'welcomeScrenMaper.dart';

class WelcomeScreen extends StatefulWidget {
  static String routeName = '/welcome';
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            color: ColorConst.backgroundColor,
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: Container(),
                flex: 2,
              ),
              Expanded(
                flex: 5,
                child: Card(
                  color: ColorConst.backgroundColor,
                  child: CarouselSlider(
                      slideIndicator: CircularSlideIndicator(
                        currentIndicatorColor: Colors.white,
                        padding: EdgeInsets.only(bottom: 32),
                      ),
                      children: StringConst.slider
                          .map((e) => Padding(
                                padding: EdgeInsets.symmetric(horizontal: 30),
                                child: WelcomeScreenCard(
                                  heading: e['header'],
                                  body: e['text'] as List<String>,
                                  image: e['image'],
                                ),
                              ))
                          .toList()),
                ),
              ),
              SizedBox(
                height: 14,
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                child: Column(
                  children: [
                    Text(
                      StringConst.PRIVACYPOLICYTEXT,
                      style: Theme.of(context)
                          .textTheme
                          .caption
                          .copyWith(fontSize: 15),
                    ),
                    SizedBox(
                      height: 4,
                    ),
                    InkWell(
                      onTap: () => Navigator.pushNamed(
                          context, LicenseAggrement.routeName),
                      child: Text(
                        StringConst.ENDUSERLISCENS,
                        style: Theme.of(context).textTheme.caption.copyWith(
                              color: Colors.blue,
                              decoration: TextDecoration.underline,
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                    ),
                    SizedBox(
                      height: 4,
                    ),
                    Text(
                      "AND",
                      style: Theme.of(context)
                          .textTheme
                          .caption
                          .copyWith(fontSize: 15),
                    ),
                    SizedBox(
                      height: 4,
                    ),
                    InkWell(
                      onTap: () =>
                          Navigator.pushNamed(context, PrivacyPolicy.routeName),
                      child: Text(
                        StringConst.PRIVACy,
                        style: Theme.of(context).textTheme.caption.copyWith(
                            color: Colors.blue,
                            decoration: TextDecoration.underline,
                            fontSize: 15,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              ),
              InkWell(
                onTap: () async {
                  SharedPreferences _pref =
                      await SharedPreferences.getInstance();
                  _pref.setString('firstTime', 'false');
                  Navigator.pushReplacementNamed(context, Home.routeName);
                  // Provider.of<Auth>(context, listen: false).firstTimeLogin();
                },
                child: Center(
                  child: Card(
                    color: ColorConst.backgroundColor,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    elevation: 5,
                    child: Container(
                      width: MediaQuery.of(context).size.width / 2 - 10,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.white)),
                      padding:
                          EdgeInsets.symmetric(horizontal: 10, vertical: 20),
                      child: Center(
                          child: Text(
                        'Continue',
                        style: TextStyleConst.body1,
                      )),
                    ),
                  ),
                ),
              ),
              Expanded(child: Container())
            ],
          ),
        ],
      ),
    );
  }
}
