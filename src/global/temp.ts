export class Singleton {
    private static instance: Singleton;
  
    private constructor() {
      console.log("Singleton instance created");
    }
  
    static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  
    someMethod() {
      console.log("Method called on Singleton");
    }
  }
  