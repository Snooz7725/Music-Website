$outputFile = ".\file-list.txt"

$excludedExtensions = @(
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".svg", ".ico"
)

$excludedFolders = @(
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "public",
    "assets"
)

if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

Get-ChildItem -Path . -Recurse -File |
Where-Object {

    # skip image files
    ($excludedExtensions -notcontains $_.Extension.ToLower()) -and

    # skip blacklisted folders
    (-not ($_.FullName -split '\\' | Where-Object { $excludedFolders -contains $_ }))

} |
ForEach-Object {

    $filePath = $_.FullName

    Add-Content $outputFile "==============================="
    Add-Content $outputFile "FILE: $filePath"
    Add-Content $outputFile "==============================="

    try {
        $content = Get-Content $filePath -Raw -ErrorAction Stop
        Add-Content $outputFile $content
    }
    catch {
        Add-Content $outputFile "[ERROR READING FILE]"
    }

    Add-Content $outputFile "`n`n"
}

Write-Host "Full project dump created at $outputFile"