import 'package:flutter/material.dart';

import '../../constants/textStyleConst.dart';

class WelcomeScreenCard extends StatelessWidget {
  final String heading;
  final List<String> body;
  final String image;
  const WelcomeScreenCard({
    Key key,
    @required this.heading,
    @required this.body,
    @required this.image,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          heading,
          style: TextStyleConst.header1.copyWith(
            fontSize: 25,
            letterSpacing: 2,
          ),
        ),
        SizedBox(
          height: 20,
        ),
        ...body
            .map(
              (e) => Text(
                e,
                style: TextStyleConst.body1.copyWith(),
              ),
            )
            .toList(),
        SizedBox(
          height: 20,
        ),
        Container(
            height: MediaQuery.of(context).size.height / 4,
            child: Image.asset(
              image,
            ))
      ],
    );
  }
}
