// Run from xena_mobile: flutter test --no-pub ../rina-website/scripts/capture_app_screens_test.dart
// Captures the actual Flutter widgets with demo/fixture content, not live users.
import 'dart:io';
import 'dart:ui' as ui;
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:xena_mobile/core/theme/app_theme.dart';
import 'package:xena_mobile/features/home/presentation/screens/home_screen.dart';
import 'package:xena_mobile/features/live/presentation/screens/live_viewer_screen.dart';
import 'package:xena_mobile/features/explore/presentation/widgets/live_room_card.dart';
import 'package:xena_mobile/features/moments/presentation/screens/moments_screen.dart';
import 'package:xena_mobile/features/profile/presentation/screens/profile_screen.dart';
import 'package:xena_mobile/features/inbox/presentation/screens/inbox_screens.dart';
import 'package:xena_mobile/features/voice_room/presentation/screens/voice_room_screen.dart';
import '../../xena_mobile/test/party_room_layout_test.dart' as party;
import '../../xena_mobile/test/pk_notification_flow_test.dart' show PkFixture;

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('capture actual Rina screens for website', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final messenger = TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
    for (final channel in ['xyz.luan/audioplayers.global', 'xyz.luan/audioplayers.global/events']) {
      messenger.setMockMethodCallHandler(MethodChannel(channel), (_) async => null);
    }
    messenger.setMockMethodCallHandler(const MethodChannel('xyz.luan/audioplayers'), (call) async {
      if (call.method == 'create') {
        final id = (call.arguments as Map)['playerId'];
        messenger.setMockMethodCallHandler(MethodChannel('xyz.luan/audioplayers/events/$id'), (_) async => null);
      }
      return 1;
    });
    messenger.setMockMethodCallHandler(const MethodChannel('rina/capture_protection'), (_) async => {
      'supported': true, 'screenshotsBlocked': true, 'captured': false,
    });
    await (FontLoader('Outfit')..addFont(rootBundle.load('assets/fonts/Outfit-Variable.ttf'))).load();
    await (FontLoader('MaterialIcons')..addFont(rootBundle.load('fonts/MaterialIcons-Regular.otf'))).load();
    // Register the host emoji font so screenshot text renders like the native app.
    final emojiFile = File('/System/Library/Fonts/Apple Color Emoji.ttc');
    final emojiBytes = await tester.runAsync(() async => await emojiFile.exists() ? await emojiFile.readAsBytes() : null);
    if (emojiBytes != null) {
      await (FontLoader('Apple Color Emoji')..addFont(Future.value(ByteData.sublistView(emojiBytes)))).load();
    }
    final baseTheme = AppTheme.light;
    final captureTheme = baseTheme.copyWith(
      textTheme: baseTheme.textTheme.apply(fontFamilyFallback: ['Apple Color Emoji']),
      primaryTextTheme: baseTheme.primaryTextTheme.apply(fontFamilyFallback: ['Apple Color Emoji']),
    );
    await tester.binding.setSurfaceSize(const Size(390, 844));
    final fixture = PkFixture(accepted: true, status: 'ready', host: true);
    final screens = <String, Widget>{
      'home': const HomeScreen(),
      'live': const LiveViewerScreen(room: LiveRoomData(host: 'Maya', title: 'Music & good company', viewers: '0', country: 'PK', image: 'assets/images/creator_maya.png', verified: false)),
      'voice': VoiceRoomScreen(room: party.room()),
      'pk': LiveViewerScreen(api: fixture.api, room: fixture.liveRoom),
      'moments': const MomentsScreen(),
      'profile': const ProfileScreen(),
      'inbox': const InboxScreen(),
    };
    final output = Directory('../rina-website/public/screenshots');
    await tester.runAsync(() => output.create(recursive: true));
    for (final entry in screens.entries) {
      const capture = ValueKey('website-capture');
      await tester.pumpWidget(MaterialApp(debugShowCheckedModeBanner: false, theme: captureTheme,
        home: RepaintBoundary(key: capture, child: entry.value)));
      await tester.pump(const Duration(milliseconds: 700));
      final context = tester.element(find.byKey(capture));
      await tester.runAsync(() async {
        await Future.wait(['creator_maya.png','creator_noah.png','creator_sora.png','app_icon.png','rina_logo_v2.png'].map((name) => precacheImage(AssetImage('assets/images/$name'), context)));
      });
      await tester.pump(const Duration(milliseconds: 100));
      final boundary = tester.renderObject<RenderRepaintBoundary>(find.byKey(capture));
      await tester.runAsync(() async {
        final image = await boundary.toImage(pixelRatio: 2);
        final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
        await File('${output.path}/${entry.key}.png').writeAsBytes(bytes!.buffer.asUint8List());
        image.dispose();
      });
      expect(tester.takeException(), isNull, reason: '${entry.key} screenshot');
      await tester.pumpWidget(const SizedBox());
      await tester.pump(const Duration(milliseconds: 100));
    }
    await tester.binding.setSurfaceSize(null);
  });
}
