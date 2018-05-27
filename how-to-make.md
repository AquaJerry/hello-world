# How to Make

## Explicit Rule

```make
# recipe will be run unless the oldest target is newer than all prerequisites
# targets:
# - object files
# - executables
# - phonys
# prerequisites:
# - targets
# - files
# recipe:
# - shell script
targets : prerequisites
	recipe
```

### Sample

```make
# build ed from src.c unless ed is newer than src.c
ed : src.c
	cc -o ed src.c
```


## Other Basic Rules

### Comment

```make
# comment
# escape comment with "\#"
```


### Variable

```make
# let name be something
name = something
```
```make
# call something by name
$(name)
```

#### Sample

```make
# let object be edit.o
object = edit.o

# call edit.o by object
edit : $(object)
	cc -o edit $(object)
```


### Implicit

```make
# same as
# $(target).o : $(target).c $(headers)
# 	cc -o $(target).o -c $(target).c
$(target).o : $(headers)
```

#### Sample

```make
# same as
# main.o : main.c defs.h
# 	cc -o main.o -c main.c
main.o : defs.h
```


### Phony

```make
# a phony is something that is NOT a name of file
.PHONY : $(phony)
```

#### example

```make
# no such a file named 'clean'
.PHONY : clean
clean :
	-rm edit $(objects)
```


### Include

```make
# suspend reading the current makefile
# read other makefiles before continuing
include $(filenames)
```

#### Sample

```make
# probably same as `include foo a.mk b.mk c.mk bish bash`
include foo *.mk $(bar)
```


## Other Rules

### Split Long Line (Sample)

```make
objects = main.o kbd.o command.o display.o \
		insert.o search.o files.o utils.o
```


### Another Style of Explicit Rule

```make
targets : prerequisites ; recipe
```


## A Simple Sample

```make
# makefile

objects = main.o kbd.o command.o display.o \
		insert.o search.o files.o utils.o

edit : $(objects)
	cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
	rm edit $(objects)
```

Then try these in your terminal:

```sh
# create the executable
make
```

```sh
# delete the executable and object files
make clean
```

### Another Style of Makefile

```diff
--- a/makefile
+++ b/makefile
@@ -6,14 +6,9 @@ objects = main.o kbd.o command.o display.o \
 edit : $(objects)
 	cc -o edit $(objects)
 
-main.o : defs.h
-kbd.o : defs.h command.h
-command.o : defs.h command.h
-display.o : defs.h buffer.h
-insert.o : defs.h buffer.h
-search.o : defs.h buffer.h
-files.o : defs.h buffer.h command.h
-utils.o : defs.h
+$(objects) : defs.h
+kdb.o command.o files.o : command.h
+display.o insert.o search.o files.o : buffer.h
 
 .PHONY : clean
 clean :
```
