import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

const APP_URL = 'https://deep-sea-bounty.base44.app/';
const DEEP_BLUE = '#033563';
const GOLD = '#f2b632';

export default function App() {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
      const onBackPress = () => {
        if (canGoBack && webviewRef.current) {
          webviewRef.current.goBack();
          return true;
        }
        return false;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
  }, [canGoBack]);

  const reload = () => {
    setError(false);
    setLoading(true);
    webviewRef.current && webviewRef.current.reload();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <WebView
          ref={webviewRef}
          source={{ uri: APP_URL }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={GOLD} />
              <Text style={styles.loadingText}>Diving in…</Text>
            </View>
          )}
          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          onHttpError={() => {
            setLoading(false);
            setError(true);
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        {error && (
          <View style={styles.center}>
            <Text style={styles.errorTitle}>No connection</Text>
            <Text style={styles.errorText}>
              Deep Sea Bounty needs an internet connection to load.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={reload}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEEP_BLUE,
  },
  webview: {
    flex: 1,
    backgroundColor: DEEP_BLUE,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DEEP_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: '#cfe3f7',
    fontSize: 16,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  errorText: {
    color: '#9db8d6',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: GOLD,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 24,
  },
  retryText: {
    color: DEEP_BLUE,
    fontSize: 16,
    fontWeight: '700',
  },
});
