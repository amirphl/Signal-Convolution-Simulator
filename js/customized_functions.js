function heaviside(x) {
    return (x >= 0) ? 1 : 0;
}

// attach a transform function to the function heaviside
heaviside.transform = function (x) {
    return heaviside(x);
};

// import the function into math.js
math.import({
    heaviside: heaviside
});

