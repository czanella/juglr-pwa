const config = {
    gravity: 600,
    ballRadius: 20,
    hitAreaRadius: 100,
    newBallInterval: 5000,
    maxInitialSpeedX: 300,
    tapImpulse: [600, 900],
    tapAngle: [60, 120],
    ballColors: [
        ['rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)'],
        ['rgb(0, 255, 0)', 'rgba(0, 255, 0, 0.5)'],
        ['rgb(0, 0, 255)', 'rgba(0, 0, 255, 0.5)'],
        ['rgb(255, 255, 0)', 'rgba(255, 255, 0, 0.5)'],
        ['rgb(255, 0, 255)', 'rgba(255, 0, 255, 0.5)'],
        ['rgb(0, 255, 255)', 'rgba(0, 255, 255, 0.5)'],
    ],
    trailLength: 20,
    backgroundColor: '#550000',
};

export default config;
