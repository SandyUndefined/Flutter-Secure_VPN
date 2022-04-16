import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:securevpn/constants/stringConst.dart';

class PrivacyPolicy extends StatelessWidget {
  static const routeName = '/privacy-policy';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Privacy Policy'),
      ),
      body: SingleChildScrollView(
        child: Html(
          data: StringConst.PRIVACYPOLICY,
        ),
      ),
    );
  }
}
