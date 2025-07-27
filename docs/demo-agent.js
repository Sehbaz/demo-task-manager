#!/usr/bin/env node

/**
 * Simple demonstration script showing how agents work
 * This can be run independently to demonstrate agent concepts
 */

// Simple agent implementation without external dependencies
class SimpleTaskAgent {
  constructor() {
    console.log('🤖 Task Agent initialized');
  }

  // Priority suggestion agent
  suggestPriority(task) {
    const now = new Date();
    const daysUntilDue = task.dueDate 
      ? Math.ceil((task.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : Infinity;

    if (daysUntilDue <= 2 || (task.dependencies && task.dependencies.length > 0)) {
      return 'high';
    } else if (daysUntilDue <= 7 || (task.estimatedHours && task.estimatedHours > 8)) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  // Workload balancing agent
  suggestAssignee(users, task) {
    // Simple algorithm: find user with least current workload
    const availableUser = users.reduce((prev, current) => 
      (prev.currentWorkload < current.currentWorkload) ? prev : current
    );
    
    return {
      userId: availableUser.id,
      reason: `User has lowest workload (${availableUser.currentWorkload} hours)`,
      confidence: 0.8
    };
  }

  // Notification agent
  checkOverdueTasks(tasks) {
    const now = new Date();
    const overdueTasks = tasks.filter(task => 
      task.dueDate && task.dueDate < now && task.status !== 'completed'
    );
    
    if (overdueTasks.length > 0) {
      console.log(`⚠️  Found ${overdueTasks.length} overdue tasks:`);
      overdueTasks.forEach(task => {
        console.log(`   - ${task.title} (due: ${task.dueDate.toDateString()})`);
      });
      return overdueTasks;
    } else {
      console.log('✅ No overdue tasks found');
      return [];
    }
  }
}

// Demonstration
function demonstrateAgents() {
  console.log('\n=== Agent Demonstration ===\n');
  
  const agent = new SimpleTaskAgent();
  
  // Sample data
  const tasks = [
    {
      id: 'task-1',
      title: 'Fix critical bug',
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      status: 'in_progress',
      estimatedHours: 4,
      dependencies: ['task-0']
    },
    {
      id: 'task-2',
      title: 'Update documentation',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      status: 'todo',
      estimatedHours: 2
    },
    {
      id: 'task-3',
      title: 'Refactor database layer',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Next month
      status: 'todo',
      estimatedHours: 16
    }
  ];
  
  const users = [
    { id: 'user-1', name: 'Alice', currentWorkload: 30 },
    { id: 'user-2', name: 'Bob', currentWorkload: 25 },
    { id: 'user-3', name: 'Charlie', currentWorkload: 35 }
  ];
  
  console.log('1. Priority Suggestion Agent:');
  tasks.forEach(task => {
    const priority = agent.suggestPriority(task);
    console.log(`   ${task.title} → Priority: ${priority.toUpperCase()}`);
  });
  
  console.log('\n2. Assignment Suggestion Agent:');
  const newTask = {
    title: 'Implement new feature',
    estimatedHours: 12
  };
  const suggestion = agent.suggestAssignee(users, newTask);
  console.log(`   ${newTask.title} → Assign to: ${suggestion.userId} (${suggestion.reason})`);
  
  console.log('\n3. Overdue Task Notification Agent:');
  agent.checkOverdueTasks(tasks);
  
  console.log('\n4. Smart Insights:');
  const totalWorkload = users.reduce((sum, user) => sum + user.currentWorkload, 0);
  const avgWorkload = totalWorkload / users.length;
  console.log(`   Average team workload: ${avgWorkload.toFixed(1)} hours`);
  console.log(`   Team utilization: ${((avgWorkload / 40) * 100).toFixed(1)}%`);
  
  const overloadedUsers = users.filter(user => user.currentWorkload > avgWorkload * 1.2);
  if (overloadedUsers.length > 0) {
    console.log(`   ⚠️  Overloaded team members: ${overloadedUsers.map(u => u.name).join(', ')}`);
  }
  
  console.log('\n=== End Demonstration ===\n');
  console.log('💡 This demonstrates how agents can:');
  console.log('   • Automatically prioritize tasks');
  console.log('   • Suggest optimal task assignments');
  console.log('   • Monitor for overdue items');
  console.log('   • Provide intelligent insights');
  console.log('\n📚 See docs/AGENTS.md for comprehensive information!');
}

// Run the demonstration
if (require.main === module) {
  demonstrateAgents();
}

module.exports = { SimpleTaskAgent, demonstrateAgents };