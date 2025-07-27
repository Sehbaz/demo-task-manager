import { Test, TestingModule } from '@nestjs/testing';
import { TaskManagementAgent } from './example-agent';

describe('TaskManagementAgent', () => {
  let agent: TaskManagementAgent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskManagementAgent],
    }).compile();

    agent = module.get<TaskManagementAgent>(TaskManagementAgent);
  });

  describe('suggestTaskPriority', () => {
    it('should suggest high priority for tasks due in 2 days or less', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const taskData = {
        dueDate: tomorrow,
        projectId: 'project-123',
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('high');
    });

    it('should suggest high priority for tasks with dependencies', async () => {
      const taskData = {
        projectId: 'project-123',
        dependencies: ['task-1', 'task-2'],
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('high');
    });

    it('should suggest high priority for large tasks (>20 hours)', async () => {
      const taskData = {
        projectId: 'project-123',
        estimatedHours: 25,
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('high');
    });

    it('should suggest medium priority for tasks due in a week', async () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      const taskData = {
        dueDate: nextWeek,
        projectId: 'project-123',
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('medium');
    });

    it('should suggest medium priority for medium-sized tasks (8+ hours)', async () => {
      const taskData = {
        projectId: 'project-123',
        estimatedHours: 10,
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('medium');
    });

    it('should suggest low priority for tasks without urgent characteristics', async () => {
      const farFuture = new Date();
      farFuture.setDate(farFuture.getDate() + 30);

      const taskData = {
        dueDate: farFuture,
        projectId: 'project-123',
        estimatedHours: 4,
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('low');
    });

    it('should handle tasks with no due date', async () => {
      const taskData = {
        projectId: 'project-123',
        estimatedHours: 2,
      };

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('low');
    });

    it('should return medium priority on error as safe default', async () => {
      const taskData = null as any; // Force an error

      const priority = await agent.suggestTaskPriority(taskData);
      expect(priority).toBe('medium');
    });
  });

  describe('suggestTaskAssignee', () => {
    it('should return a suggestion with confidence and reason', async () => {
      const taskData = {
        projectId: 'project-123',
        skillsRequired: ['typescript', 'react'],
        estimatedHours: 8,
      };

      const suggestion = await agent.suggestTaskAssignee(taskData);
      
      expect(suggestion).toBeDefined();
      expect(suggestion).toHaveProperty('userId');
      expect(suggestion).toHaveProperty('confidence');
      expect(suggestion).toHaveProperty('reason');
      expect(suggestion!.confidence).toBeGreaterThan(0);
      expect(suggestion!.confidence).toBeLessThanOrEqual(1);
    });

    it('should handle errors gracefully', async () => {
      const taskData = null as any; // Force an error

      const suggestion = await agent.suggestTaskAssignee(taskData);
      expect(suggestion).toBeNull();
    });
  });

  describe('optimizeResourceAllocation', () => {
    it('should return recommendations and health status', async () => {
      const projectId = 'project-123';

      const result = await agent.optimizeResourceAllocation(projectId);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('overallHealth');
      expect(Array.isArray(result.recommendations)).toBe(true);
      expect(['good', 'warning', 'critical']).toContain(result.overallHealth);
    });

    it('should provide actionable recommendations', async () => {
      const projectId = 'project-123';

      const result = await agent.optimizeResourceAllocation(projectId);
      
      if (result.recommendations.length > 0) {
        const recommendation = result.recommendations[0];
        expect(recommendation).toHaveProperty('action');
        expect(recommendation).toHaveProperty('taskId');
        expect(recommendation).toHaveProperty('reason');
        expect(['reassign', 'redistribute', 'extend_deadline']).toContain(recommendation.action);
      }
    });

    it('should handle errors by returning safe defaults', async () => {
      const projectId = null as any; // Force an error

      const result = await agent.optimizeResourceAllocation(projectId);
      
      expect(result).toBeDefined();
      expect(result.recommendations).toEqual([]);
      expect(result.overallHealth).toBe('good');
    });
  });

  describe('processSmartNotification', () => {
    it('should process task_created events', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const event = {
        type: 'task_created' as const,
        data: { taskId: 'task-123' },
        userId: 'user-123',
      };

      await agent.processSmartNotification(event);
      
      expect(consoleSpy).toHaveBeenCalledWith('🤖 Agent: Processing task_created notification...');
      expect(consoleSpy).toHaveBeenCalledWith('✅ Agent: Smart notification processed');
      
      consoleSpy.mockRestore();
    });

    it('should process task_completed events', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const event = {
        type: 'task_completed' as const,
        data: { taskId: 'task-123' },
        userId: 'user-123',
      };

      await agent.processSmartNotification(event);
      
      expect(consoleSpy).toHaveBeenCalledWith('🤖 Agent: Processing task_completed notification...');
      expect(consoleSpy).toHaveBeenCalledWith('✅ Agent: Smart notification processed');
      
      consoleSpy.mockRestore();
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const event = null as any; // Force an error

      await agent.processSmartNotification(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Agent: Error processing smart notification:')
      );
      
      consoleSpy.mockRestore();
    });
  });
});

/**
 * Integration tests for agent functionality
 */
describe('TaskManagementAgent Integration', () => {
  let agent: TaskManagementAgent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskManagementAgent],
    }).compile();

    agent = module.get<TaskManagementAgent>(TaskManagementAgent);
  });

  it('should demonstrate complete agent workflow', async () => {
    // 1. Suggest priority for a new task
    const taskData = {
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      projectId: 'project-123',
      estimatedHours: 12,
      dependencies: ['task-1'],
    };

    const priority = await agent.suggestTaskPriority(taskData);
    expect(priority).toBe('high'); // Should be high due to due date and dependencies

    // 2. Suggest assignee for the task
    const assigneeSuggestion = await agent.suggestTaskAssignee({
      projectId: taskData.projectId,
      skillsRequired: ['typescript', 'database'],
      estimatedHours: taskData.estimatedHours,
    });

    expect(assigneeSuggestion).toBeDefined();
    expect(assigneeSuggestion!.confidence).toBeGreaterThan(0);

    // 3. Process notification for task creation
    await agent.processSmartNotification({
      type: 'task_created',
      data: { ...taskData, priority, assignee: assigneeSuggestion!.userId },
      userId: 'manager-123',
    });

    // 4. Optimize resource allocation
    const optimization = await agent.optimizeResourceAllocation(taskData.projectId);
    expect(optimization.overallHealth).toBeDefined();
  });
});