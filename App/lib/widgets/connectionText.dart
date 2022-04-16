import 'dart:async';
import 'dart:io';
import 'package:firebase_admob/firebase_admob.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:securevpn/constants/colorsConst.dart';
import 'package:securevpn/modal/vpn.dart';

import 'package:securevpn/constants/stringConst.dart';

class ConnectionText extends StatefulWidget {
  @override
  _ConnectionTextState createState() => _ConnectionTextState();
}

class _ConnectionTextState extends State<ConnectionText> {
  Stopwatch _stopwatch;
  InterstitialAd _interstitialAd;
  static const MobileAdTargetingInfo targetingInfo = MobileAdTargetingInfo(
    // testDevices: testDevice != null ? <String>[testDevice] : null,
    keywords: <String>['foo', 'bar'],
    contentUrl: 'http://foo.com/bar.html',
    childDirected: true,
    nonPersonalizedAds: true,
  );

  InterstitialAd createInterstitialAd() {
    return InterstitialAd(
      adUnitId: Platform.isAndroid
          ? StringConst.ADMOB_APP_INTERSTITIAL_Android
          : Platform.isIOS
              ? StringConst.ADMOB_APP_INTERSTITIAL_IOS
              : "",
      targetingInfo: targetingInfo,
      listener: (MobileAdEvent event) {
        print("InterstitialAd event $event");
      },
    );
  }

  @override
  void initState() {
    _interstitialAd?.dispose();
    _interstitialAd = createInterstitialAd()..load();
    super.initState();

    _stopwatch = Stopwatch();
  }

  void handleStartStop() {
    if (_stopwatch.isRunning) {
      _stopwatch.stop();
    } else {
      _stopwatch.start();
    }
    setState(() {}); // re-render the page
  }

  String formatTime(int milliseconds) {
    var secs = milliseconds ~/ 1000;
    var hours = (secs ~/ 3600).toString().padLeft(2, '0');
    var minutes = ((secs % 3600) ~/ 60).toString().padLeft(2, '0');
    var seconds = (secs % 60).toString().padLeft(2, '0');
    return "$hours:$minutes:$seconds";
  }

  Timer timer;

  @override
  Widget build(BuildContext context) {
    if (Provider.of<Vpns>(context).connectionState == 'CONNECTED') {
      _interstitialAd?.show();
      _stopwatch.start();
      timer =
          Timer.periodic(Duration(seconds: 1), (Timer t) => setState(() {}));
    } else {
      _stopwatch.reset();
      _stopwatch.stop();
    }

    return InkWell(
      onTap: () {
        if (Provider.of<Vpns>(context, listen: false).connectedVpn != null) {
          Provider.of<Vpns>(context, listen: false).disconnect();
        }
      },
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(text: '', style: connectedStyle, children: [
          TextSpan(
              text: Provider.of<Vpns>(context).connectionState + '\n',
              style: connectedGreenStyle),
          Provider.of<Vpns>(context).connectionState == 'CONNECTED'
              ? TextSpan(
                  text: formatTime(_stopwatch.elapsedMilliseconds),
                  style: connectedSubtitle)
              : TextSpan(),
        ]),
      ),
    );
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }
}
