mkdir deploy

cp -r ./build/web-mobile/ deploy/

git add -f deploy
git commit -m "deploy commit"
git subtree push --prefix deploy origin gh-pages

rm -rf deploy