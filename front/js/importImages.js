const importAll = (r) => r.keys().forEach(r);
importAll(require.context('../images/', true, /\.(png|jpe?g|svg|gif)$/));
