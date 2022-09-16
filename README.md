# productwebbapp

Code Coverage
--------------
Step -1)First build the testing project
Step- 2)Then run the below command in serial wise

 1.)coverlet .\bin\Debug\netcoreapp3.1\ProductApi.UnitTesting.dll --target "dotnet" --targetargs "test --no-build"
 
 2.)dotnet test --collect:"XPlat Code Coverage"
 
 3.)dotnet tool install -g dotnet-reportgenerator-globaltool
  
 4.)reportgenerator -reports:".\TestResults\79d18dd6-dc61-4bed-a52a-0a67afdddcfa\coverage.cobertura.xml" -targetdir:"coverageresults" --reporttypes:HTML

 Test complete.
