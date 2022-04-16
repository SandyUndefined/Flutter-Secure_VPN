import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

const bgColor = Color(0XFF021B3A);

const curveGradient = RadialGradient(
  colors: <Color>[
    Color(0XFF313F70),
    Color(0XFF203063),
  ],
  focalRadius: 16,
);

const vpnStyle = TextStyle(
  fontWeight: FontWeight.w600,
  color: Colors.white,
  fontSize: 34,
);

const txtSpeedStyle = TextStyle(
  fontWeight: FontWeight.w300,
  fontSize: 15,
  color: Color(0XFF6B81BD),
);

const greenGradient = LinearGradient(
  colors: <Color>[
    Color(0XFF00D58D),
    Color(0XFF00C2A0),
  ],
);

const connectedStyle = TextStyle(
  fontSize: 26,
  fontWeight: FontWeight.w600,
  height: 1.6,
  color: Colors.white,
);
const connectedGreenStyle = TextStyle(
  fontSize: 26,
  fontWeight: FontWeight.w600,
  color: Colors.greenAccent,
);
const connectedSubtitle = TextStyle(
  fontSize: 20,
  fontWeight: FontWeight.w400,
  color: Colors.white,
);
const locationTitleStyle = TextStyle(
  fontSize: 12,
  fontWeight: FontWeight.w200,
  color: Color(0XFF9BB1BD),
);

class ColorConst {
  static const Color splashScreenBall = Color(0xFF611923);
  static const Color backgroundColor = Color(0xFF021B3A);

  static const LinearGradient PRIMARYGRADIENT = LinearGradient(
    begin: Alignment(0.9661, 0.5),
    end: Alignment(0, 0.5),
    stops: [
      0,
      1,
    ],
    colors: [
      Color.fromARGB(255, 255, 86, 115),
      Color.fromARGB(255, 255, 140, 72),
    ],
  );

  static const SECONDARYGRADIENT = LinearGradient(
    begin: Alignment(0, 1.0),
    end: Alignment(1.0, 0.5),
    stops: [
      0,
      1,
    ],
    colors: [
      Color.fromARGB(255, 255, 174, 139),
      Color.fromARGB(255, 255, 150, 159),
    ],
  );

  static const FACEBOOKGRADIENT = LinearGradient(
    colors: [
      Color.fromARGB(255, 255, 86, 115),
      Color(0xFF0B84ED),
    ],
  );
}
