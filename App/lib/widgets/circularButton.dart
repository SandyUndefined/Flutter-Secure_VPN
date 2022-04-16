import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:securevpn/constants/colorsConst.dart';
import 'package:securevpn/modal/vpn.dart';

class CircularButton extends StatefulWidget {
  final double width;
  const CircularButton({
    @required this.width,
    Key key,
  }) : super(key: key);

  @override
  _CircularButtonState createState() => _CircularButtonState();
}

class _CircularButtonState extends State<CircularButton>
    with SingleTickerProviderStateMixin {
  AnimationController animationController;
  Animation<double> animation;
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
    // startTime();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: -widget.width * 0.36,
      child: Stack(
        children: [
          Stack(
            alignment: Alignment.center,
            children: <Widget>[
              Container(
                height: widget.width * 0.51,
                width: widget.width * 0.51,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: curveGradient,
                  color: Colors.red,
                ),
                child: Center(
                  child: Container(
                    height: widget.width * 0.4,
                    width: widget.width * 0.4,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: bgColor,
                    ),
                    child: Center(
                      child: Container(
                        height: widget.width * 0.3 * (animation.value + 0.45),
                        width: widget.width * 0.3 * (animation.value + 0.45),
                        decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: Provider.of<Vpns>(context, listen: false)
                                        .connectionState ==
                                    'CONNECTED'
                                ? greenGradient
                                : LinearGradient(
                                    colors: [Colors.red, Colors.redAccent]),
                            boxShadow: [
                              BoxShadow(
                                color: Color(0XFF00D58D).withOpacity(.2),
                                spreadRadius: 15,
                                blurRadius: 15,
                              ),
                            ]),
                        child: Center(
                          child: Icon(Icons.wifi_lock,
                              color: Colors.white, size: 50),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Provider.of<Vpns>(context).connectedVpn == null
                  ? SizedBox.shrink()
                  : Positioned(
                      left: 8,
                      top: 30,
                      child: Container(
                        padding: EdgeInsets.all(8),
                        height: 60,
                        width: 60,
                        decoration: BoxDecoration(
                            color: bgColor, shape: BoxShape.circle),
                        child: Center(
                          child: CircleAvatar(
                            backgroundImage: AssetImage(
                                'assests/country/${Provider.of<Vpns>(context).connectedVpn.countryCode.toLowerCase()}.png'),
                            radius: 40,
                            backgroundColor: Colors.transparent,
                          ),
                        ),
                      ),
                    ),
            ],
          ),
          InkWell(
            autofocus: true,
            onTap: () {
              if (Provider.of<Vpns>(context, listen: false).connectedVpn !=
                  null) {
                Provider.of<Vpns>(context, listen: false).disconnect();
              }
            },
            child: Container(
              height: widget.width * 0.4,
              width: widget.width * 0.4,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
