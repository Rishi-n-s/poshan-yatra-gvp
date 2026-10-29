Add-Type -AssemblyName System.Drawing
$bmps = @()
for ($i = 0; $i -lt 12; $i++) {
    $bmps += [System.Drawing.Bitmap]::FromFile("C:\Users\AC\Desktop\gir-somanth padyatrra\scratch_v1d2\photo_$i.jpg")
}
for ($i = 0; $i -lt 12; $i++) {
    for ($j = $i + 1; $j -lt 12; $j++) {
        $totalDiff = 0
        $samples = 0
        for ($x = 100; $x -lt $bmps[$i].Width - 100; $x += 100) {
            for ($y = 100; $y -lt $bmps[$i].Height - 150; $y += 100) {
                $c1 = $bmps[$i].GetPixel($x, $y)
                $c2 = $bmps[$j].GetPixel($x, $y)
                $totalDiff += [Math]::Abs($c1.R - $c2.R) + [Math]::Abs($c1.G - $c2.G) + [Math]::Abs($c1.B - $c2.B)
                $samples++
            }
        }
        $avgDiff = $totalDiff / $samples
        Write-Output "photo_$i vs photo_${j}: avg diff = $([Math]::Round($avgDiff, 1))"
    }
}
for ($i = 0; $i -lt 12; $i++) { $bmps[$i].Dispose() }
