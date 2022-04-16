import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:securevpn/constants/stringConst.dart';

class LicenseAggrement extends StatelessWidget {
  static const routeName = '/License';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('License  Agrement'),
      ),
      body: SingleChildScrollView(
        child: Html(
          data: StringConst.LISCENSAGREEMENT,
        ),
      ),
    );
  }
}
