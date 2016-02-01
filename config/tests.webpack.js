// const context = require.context('../test', true, /\.test\.js$/);
const context = require.context('../test', true, /Sharing\.component\.test\.js$/);
context.keys().forEach((v) => {
    console.log(v);
});
context.keys().forEach(context);
