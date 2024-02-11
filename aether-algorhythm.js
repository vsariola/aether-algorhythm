(u => { // u is the part
    if (!t) // if t == 0, initialize delay buffer and make alias for sin function
        d = [], S = sin;
    [y, x] = d[t %= 12e3] || [0, 0]; // note x & y are swapped when pulling from delay buffer, for ping-pong delay
    for (k = 10; k--; O = d[t] = [x, y] = [ // we swap x & y every time so it looks we do math on x only, but we're actually doing math on both channels. save also values to delay buffer and output
        y * .8, // decay the higher channels and values pulled from delay buffer
        x +
        S(S((m = u < 8.02 && 1 - p) ** 4 * // u < 8.02 makes the song eventually stop, (1-p)**4 is a kind of envelope with decay
            S(
                p * 2 ** ( // melody: "48646865" is the melody, "2203" is the chord progression (i-i-bIII-bVII). Note we pick only some notes of the melody, based on part
                    (("48646865"[r & u & 7] - "2203"[u * 8 & 3]) * 1.7 | 0) / 12 + 9 // *1.7|0 does same as *12/7|0, so it finds the white keys of a piano
                )
            ) * cosh(S(u * i) * i / 8) // add some modulation based on; higher channels modulate faster and have more modulation (*i)
        ) * u) / i ** .1 / 2 // *u makes the modulations increase over time, so we start with sound with mostly fundamental and then harmonics increase over time. /i**.1 adjusts volume per channel
        + (u > 4) * t * x % 1e-4 * m ** 50 * k ** 4 // drums. start after part > 4 and reuse row positions from all channels to add hihatty noise sounds
    ]) { // iterate over 5 "instruments/channels", processing left & right channel separately for each channel
        i = 2 ** (w = k >> 1); // w is the note duration, i is used to adjust channel modulation and volume
        r = u * 8 * w; // row withing the pattern. higher channels have shorter notes
        p = r % 1; // position within the row
    }
})(t / 6e5), O // O = final output