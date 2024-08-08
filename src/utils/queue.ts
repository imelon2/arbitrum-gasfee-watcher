export class TaskQueue {
    private tasks: (() => Promise<void>)[] = [];
    private isProcessing = false;
  
    public addTask(task: () => Promise<void>) {
      this.tasks.push(task);
      if (!this.isProcessing) {
        this.processNextTask();
      }
    }
  
    private async processNextTask() {
      if (this.tasks.length === 0) {
        this.isProcessing = false;
        return;
      }
  
      this.isProcessing = true;
      const task = this.tasks.shift();
      if (task) {
        await task();
      }
      this.processNextTask();
    }
  }