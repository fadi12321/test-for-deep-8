ALL=filebeat metricbeat auditbeat heartbeat
BEAT_VERSION=$(shell head -n 1 ../../libbeat/docs/version.asciidoc | cut -c 17- )

.PHONY: all $(ALL)

all: $(ALL)

test: all
	for FILE in $(shell ls *-kubernetes.yaml); do \
		BEAT=$$(echo $$FILE | cut -d \- -f 1); \
		kubectl create -f $$FILE; \
	done

clean:
	@for f in $(ALL); do rm -f "$$f-kubernetes.yaml"; done

$(ALL):
	@echo "Generating $@-kubernetes.yaml"
	@rm -f $@-kubernetes.yaml
	@for f in service-account role role-binding configmap deployment daemonset ; do \
		if [ -f "$@/$@-$$f.yaml" ]; then \
			echo "file: $@/$@-$$f.yaml"; \
			sed "s/%VERSION%/${BEAT_VERSION}/g" $@/$@-$$f.yaml >> $@-kubernetes.yaml; \
			echo --- >> $@-kubernetes.yaml; \
		fi \
	done
