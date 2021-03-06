const config = {
    gravity: 600,
    ballRadius: 10,
    hitAreaRadius: 100,
    firstBallInterval: 1000,
    newBallInterval: [8000, 10000],
    initialSpeedX: [-300, 300],
    initialSpeedY: [-700, -900],
    tapImpulse: [400, 600],
    tapAngle: [60 * Math.PI / 180, 120 * Math.PI / 180],
    demoBallAngle: [-30 * Math.PI / 180, -150 * Math.PI / 180],
    ballColors: [
        ['rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)'],
        ['rgb(0, 255, 0)', 'rgba(0, 255, 0, 0.5)'],
        ['rgb(0, 0, 255)', 'rgba(0, 0, 255, 0.5)'],
        ['rgb(255, 255, 0)', 'rgba(255, 255, 0, 0.5)'],
        ['rgb(255, 0, 255)', 'rgba(255, 0, 255, 0.5)'],
        ['rgb(0, 255, 255)', 'rgba(0, 255, 255, 0.5)'],
    ],
    trailLength: 20,
    backgroundColor: '#000000',
};

export default config;
