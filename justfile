# This is a justfile. See https://github.com/casey/just

# List recipes
@list:
  just --list

# List recipes
@default: list

# Clean up all test/etc. files
@clean:
  rm -rf ./public ./pkgs

# Generate jdsocs
@docs:
  jsdoc -c jsdoc.json --package ./package.json
  devd -o ./public

# Test if it does what it says on the tin
@test:
  rm -rf ./pkgs
  node index.mjs fs > /dev/null 2>&1
  test $(ls ./pkgs) == "fs" || echo "Test failed!"
  rm -rf ./pkgs
  echo "Test passed!"
