namespace VBTasks.Domain.Constants;

public static class TaskConstants
{
    public static class Status
    {
        public const string New = "New";
        public const string InProgress = "InProgress";
        public const string Review = "Review";
        public const string Blocked = "Blocked";
        public const string Completed = "Completed";
    }

    public static class Priority
    {
        public const string Low = "Low";
        public const string Medium = "Medium";
        public const string High = "High";
        public const string Critical = "Critical";
    }

    public static class AssigneeType
    {
        public const string User = "User";
        public const string Group = "Group";
    }

    public static class Defaults
    {
        public const string DefaultStatus = Status.New;
        public const string DefaultPriority = Priority.Medium;
        public const int DefaultPageSize = 20;
        public const int MaxPageSize = 100;
        public const int MaxTitleLength = 200;
        public const int MaxDescriptionLength = 2000;
    }

    public static class ErrorMessages
    {
        public const string TaskNotFound = "Task not found";
        public const string InvalidTaskData = "Invalid task data";
        public const string TitleRequired = "Title is required";
        public const string TitleTooLong = "Title must be between 1 and 200 characters";
        public const string DescriptionTooLong = "Description cannot exceed 2000 characters";
    }
}