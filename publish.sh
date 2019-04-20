if [[ $# < 2 ]]; then
  echo "
    Usage: publish [version] [package]
        version = part to increment (patch|minor|major)
        package = name of package"
  exit
fi

if [[ $1 != 'patch' ]] && [[ $1 != 'minor' ]] && [[ $1 != 'major' ]]; then
  echo "version must be patch|minor|major"
  exit
elif [[ ! -f ./dist/$2/package.json ]]; then
  echo "./dist/$2/package.json does not exist"
  exit
fi

npm run build
cd ./dist/$2
VERSION=$(npm version $1)
npm publish
git commit -am "publish $2 $VERSION"
